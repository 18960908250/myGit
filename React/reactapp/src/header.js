import React from 'react'
import {connect} from "react-redux";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            singer: ''
        }
    }

    render() {
        return (
            <header>
                <h2 className="title">添加</h2>
                <input type="button" value="返回"
                       onClick={(e) => {
                           this.props.history.goBack()
                       }}
                />&nbsp;
                <input type="text" value={this.state.title}
                       onChange={(e)=> {
                           this.setState({
                               title: e.target.value
                           })
                       }}
                       placeholder="输入歌曲名"/>&nbsp;
                <input type="text" value={this.state.singer}
                       onChange={(e)=> {
                           this.setState({
                               singer: e.target.value
                           })
                       }}
                       placeholder="输入歌手名字"/>&nbsp;
                <input type="button" value="添加音乐"
                       onClick={(e) => {
                           if (this.state.title === '' || this.state.singer === '')  return alert('歌手名或歌曲名不能为空')
                           this.props.dispatch({
                               type: 'add',
                               title: this.state.title,
                               singer: this.state.singer
                           })
                           this.setState({
                               title: '',
                               singer: ''
                           })
                           this.props.history.push('/list')
                       }}
                />
            </header>
        )
    }
}

export default connect((states, props) => {
    return states
})(Header)