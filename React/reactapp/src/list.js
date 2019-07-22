import React from 'react';
import { Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Main from './main'
import Footer from './footer'

class List extends React.Component {
    render() {
        const title = this.props.router.location.pathname === '/list' ? '播放': '收藏'
        return (
            <div id="music">
                <header>
                    <h2>{title}列表</h2>
                    <div>
                        <Link to='/add'>添加</Link>
                    </div>
                </header>
                <Main router={this.props.router}/>
                <Footer router={this.props.router}/>
            </div>
        )
    }
}
export default connect((states,props)=>{
    states.isCheckAll = states.data.every(item => item.selected)
    return states
})(List)