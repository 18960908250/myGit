import React from "react";
import {BrowserRouter, Link, Redirect, Route, Switch} from "react-router-dom";
import {connect} from 'react-redux'
import List from "./list";
import Add from "./header";
import Home from "./home";

class APP extends React.Component {
    /*constructor(){
        super(...arguments)
        this.state = {
            listStatus: true,
            data: [
                { title: 'title1', singer: 'singer', selected: false, like: false },
                { title: 'title2', singer: 'singer', selected: true, like: false },
                { title: 'title3', singer: 'singer', selected: false, like: true },
                { title: 'title4', singer: 'singer', selected: false, like: false },
            ]
        }
        this.add = this.add.bind(this)
        this.isCheckAll = this.isCheckAll.bind(this)
        this.chengeItemData = this.chengeItemData.bind(this)
        this.checkAll = this.checkAll.bind(this)
        this.deteleItemData = this.deteleItemData.bind(this)
        this.deteleMoreData = this.deteleMoreData.bind(this)
        this.setLike = this.setLike.bind(this)
        this.changeStatus = this.changeStatus.bind(this)
    }
    add(title,singer) {
        let data = this.state.data
        data.unshift({
            title,
            singer,
            selected: false,
            like: false
        })
        this.setState({data})
    }
    chengeItemData(attribute,value,index) {
        let data = this.state.data
        data[index][attribute] = value
        this.setState({data})
    }
    deteleItemData(index){
        let data = this.state.data
        data.splice(index,1)
        this.setState({data})
    }
    deteleMoreData() {
        let data = this.state.data.filter( (item) => {
            return !item.selected
        })
        this.setState({data})
    }
    setLike(status){
        let data = this.state.data.filter( (item) => {
            if (item.selected) item.like = status
            return item
        })
        this.setState({data})
    }
    changeStatus() {
        let listStatus = !this.state.listStatus
        this.setState({listStatus})
    }
    isCheckAll() {
        let data = this.state.data
        return data.every((item,index) => {
            return item.selected
        })
    }
    checkAll() {
        let data = this.state.data
        const status = this.isCheckAll() ? false : true
        data = data.map(item => {
            item.selected = status
            return item
        })
        this.setState({data})
    }*/
    render() {
        let data = this.props.data
        return (
            <BrowserRouter>
                <div className='pageBox'>
                    <nav>
                        <Link to="/">首頁</Link>
                        <span> | </span>
                        <Link to="/list">列表页</Link>
                    </nav>
                    <Switch>
                        <Route path="/list" render={(e) => {
                            if(data.length ===0) {
                                return <Redirect to="/add" />
                            }
                            return ( <List router={e}/> )
                        }}/>
                        <Route path="/like" exact render={(e) => {
                            return ( <List router={e}/> )
                        }}/>
                        <Route path="/add" exact component={Add}/>
                        <Route path="/" exact component={Home} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default connect((state,porps) =>  {
    return state
})(APP)