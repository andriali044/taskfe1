import React, { Component } from 'react'
import { Row, Col, Container, } from 'react-bootstrap';
import {Hasil, ListCategories, Menus, NavbarComponent } from "./components";
import { API_URL } from './utils/constants';
import axios from 'axios';
import swal from 'sweetalert';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
       menus: [],
       categoriYangDipilih: 'Makanan',
       keranjangs: []
    }
  }

  componentDidMount() {
    axios
      .get(API_URL+"products?category.nama="+this.state.categoriYangDipilih)
      .then(res => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch(error => {
        console.log("Error ya " , error);
      })
  }

  changeCategory = (value) => {
    this.setState({
      categoriYangDipilih: value,
      menus: []
    })

    axios
      .get(API_URL+"products?category.nama="+value)
      .then(res => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch(error => {
        console.log("Error ya " , error);
      })

  }

  masukkeranjang = (value) => {
    const keranjang = {
      jumlah: 1,
      total_harga: value.harga,
      product: value
    }

    axios
      .post(API_URL+"keranjangs", keranjang)
      .then(res => {
        swal({
          title: "Suksess Masuk Keranjang!",
          text: "Sukses Masuk Keranjang "+keranjang.product.nama,
          icon: "success",
          button: false,
        });
      })
      .catch(error => {
        console.log("Error ya " , error);
      })
    }

  render() {
    const { menus, categoriYangDipilih } = this.state
    return (
      <div className="App">
      <NavbarComponent />
      <div className='mt-3'>
        <Container fluid>
          <Row>
            <ListCategories changeCategory={this.changeCategory} categoriYangDipilih={categoriYangDipilih}/>
            <Col>
            <h4><strong>Daftar Produk</strong></h4>
            <hr />
            <Row>
              {menus && menus.map((menu) => (
                <Menus
                  key={menu.id}
                  menu={menu}
                  masukkeranjang={this.masukkeranjang}
              />
              ))}
            </Row>
            </Col>
            <Hasil />
          </Row>
    </Container>
  </div>
</div>
    )
  }
}

