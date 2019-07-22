import React from 'react'
import {connect} from 'react-redux'

class Footer extends React.Component{
    render() {
        let data = this.props.data
        let checkArr = data.filter( item => {
            return item.selected
        })
        console.log('footer', this.props)
        const pathName = this.props.router.location.pathname
        return(
            <footer style={{display: data.length ? 'block': 'none'}}>
                <div className="info">
                    <span className="align-right">当前选中{checkArr.length}首歌曲</span>
                    <span>共{data.length}首歌曲</span>
                </div>
                <input style={{display: checkArr.length ? 'inline-block': 'none'}} type="button" value="删除选中歌曲" onClick={(e) => {
                    this.props.dispatch({
                        type: 'removeSelected'
                    })
                }}/>
                <input style={{display: checkArr.length ? 'inline-block': 'none'}} type="button" value="收藏选中歌曲"
                       onClick={(e) => {
                           this.props.dispatch({
                               type: 'chenageLike',
                               status: true
                           })
                       }}
                />
                <input style={{display: checkArr.length ? 'inline-block': 'none'}} type="button" value="取消收藏选中歌曲"
                       onClick={(e) => {
                           this.props.dispatch({
                               type: 'chenageLike',
                               status: false
                           })
                       }}
                />
                <input type="button" value="查看收藏清单" style={{display: pathName === '/list' ? 'inline-block': 'none'}}
                       onClick={() => {
                           this.props.router.history.push('/like')
                       }}
                />
                <input type="button" value="查看所有清单" style={{display: pathName === '/like' ? 'inline-block': 'none'}}
                       onClick={(e) => {
                           this.props.router.history.push('/list')
                       }}
                />
            </footer>
        )
    }
}
export default connect((states, props) => {
    return states
})(Footer)