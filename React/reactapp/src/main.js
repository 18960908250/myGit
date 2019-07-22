import React from 'react'
import {connect} from 'react-redux'
import Item from './item'

class Main extends React.Component{
    constructor() {
        super(...arguments)
        this.state = {
            data: this.props.data
        }
    }
    render() {
        let data = this.props.data
        if (this.props.router.location.pathname === '/like') data = data.filter(item => item.like)
        return (
            <table className="main" style={{display: data.length ? 'table': 'none'}}>
                <thead>
                <tr>
                    <th width="10%">
                        <input
                            type="checkbox"
                            checked={this.props.isCheckAll}
                            onChange={
                                (e) => {
                                    // this.props.checkAll()
                                    this.props.dispatch({
                                        type: 'checkAll',
                                        isCheckAll: this.props.isCheckAll
                                    })
                                }
                            }
                    /> 全选
                    </th>
                    <th width="50%px">歌曲</th>
                    <th width="20%px">歌手</th>
                    <th width="10%">收藏</th>
                    <th width="10%">删除</th>
                </tr>
                </thead>
                <tbody>
                {data.map( (items,index)=>{
                    return (
                        <Item key={index} index={items.id} itemData={items} />
                    )
                })}
                </tbody>
            </table>
        )
    }
}
/*chengeItemData={this.props.chengeItemData} deteleItemData = {this.props.deteleItemData}*/
export default connect((states, props) => {
    const isCheckAll = (() => {
        return states.data.every(item => item.selected)
    })()
    return Object.assign({},states, {isCheckAll})
})(Main)