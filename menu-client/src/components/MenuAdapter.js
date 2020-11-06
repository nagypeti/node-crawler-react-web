import { Component } from 'react'
import { Container } from 'semantic-ui-react'

class MenuAdapter extends Component {
    constructor(props) {
        super(props)
        this.state = { menu: {} }
    }

    fetchData = async () => {
        await fetch(`http://localhost:8080/api/menus/${this.props.option}`)
            .then(res => res.json())
            .then(res => { this.setState({ menu: this.transformMenu(res) }) })
            .catch(err => err)
    }

    async componentDidMount() {
        await this.fetchData()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.option !== this.props.option) {
            this.fetchData()
        }
        console.log(prevProps, prevState)
    }

    transformMenu = (menu) => {
        return {
            title: menu.title.toUpperCase(),
            date: new Date().toDateString(),
            price: menu.price,
            soup: menu.soup,
            mainDish: menu.mainDish,
        }
    }

    render() {
        return (
            <Container>
                <h2>Menu {this.state.menu.title}</h2>
                <h3>{this.state.menu.date}</h3>
                <p>Price : {this.state.menu.price}</p>
                <p>Soup : {this.state.menu.soup}</p>
                <p>Main dish : {this.state.menu.mainDish}</p>
            </Container>
        )
    }
}

export default MenuAdapter
