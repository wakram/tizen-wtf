import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import $ from 'jquery';


const getAPILink = query => {
  return `https://api.import.io/store/connector/d963e137-9309-42c1-b27d-b99118a8b1d2/_query?input=webpage/url:https%3A%2F%2Fbikroy.com%2Fen%2Fads%2Fads-in-dhaka-1211%3Fquery%3D${encodeURI(query)}&&_apikey=addcd769401f47dc9185c1fbc591b1ddd9c77b680e43d4697346560f9c8ba1f48274afc70be5472aac708999cd7f3b29dd33f6c1046a6188e05dbf1d5eea2662a8d80d75ba51c7eef10c1a42b898ef79`;
}

const getEkhoniLink = query => {
  return `https://api.import.io/store/connector/79ab9be9-d384-40eb-bccd-9b09f31e93a9/_query?input=webpage/url:http%3A%2F%2Fwww.ekhanei.com%2Fen%2Fdhaka%2F${encodeURI(query)}%2Ffor-sale&&_apikey=addcd769401f47dc9185c1fbc591b1ddd9c77b680e43d4697346560f9c8ba1f48274afc70be5472aac708999cd7f3b29dd33f6c1046a6188e05dbf1d5eea2662a8d80d75ba51c7eef10c1a42b898ef79`;
}

export default class SearchContainer extends Component {
  state = {
    loading: false,
    error: false,
    data: []
  };

  render () {
    const {loading, error} = this.state;
    if(loading) {
      return (
        <div>
          <h3>Search for many things </h3>
          <input type="text" disabled={true} />
          <div>Loading ...</div>
        </div>
      );
    }

    if (error) {
      return (
        <div>
          <h3>Search for many things </h3>
          <input type="text" onKeyDown={this._onSearch}/>
          <div>{this.state.errorMsg}</div>
        </div>
      );
    }

    return (
      <div>
        <h3>Search for many things </h3>
        <input type="text" onKeyDown={this._onSearch} />
        <br />
        <pre>
          <ul>
            {this.state.data.map((item, key) =>
              <li key={key}>
                <a href={item.item_link}>{item.name}</a>
              </li>)}
          </ul>
        </pre>
      </div>
    );
  }

  _onSearch = (event) => {
    if(event.keyCode === 13) {
      this.setState({loading: true});
      this.searchItems(event.target.value);
    }
  }

  searchBikroy = async (term) => {
    try {
      const res = await fetch(getAPILink(term));
      const json = await res.json();
      return json.results;
    }
    catch (err) {
      throw err;
    }
  };

  searchEkhoni = async (term) => {
    try {
      const res = await fetch(getEkhoniLink(term));
      const json = await res.json();
      return json.results;
    }
    catch (err) {
      throw err;
    }
  };

  searchItems = async (term = 'Iphone') => {
    try {
      const responses = await Promise.all([this.searchBikroy(term), this.searchEkhoni(term)]);
      const items = [...responses[0], ...responses[1]];
      if(!items.length) {
        this.setState({error: true, errorMsg: 'Sorry! No items were found.', loading: false});
      }
      else {
        this.setState({data: items, loading: false, error: false});
      }
    }
    catch (err) {
      this.setState({error: true, loading: false, errorMsg: `Sorry! could not fetch items`});
      throw err;
    }
  };
}
