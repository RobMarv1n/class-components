import { Component } from 'react';
import SearchBox from './components/SearchBox/SearchBox';

class MainPage extends Component {
  render() {
    return (
      <section className="main-page">
        <SearchBox />
      </section>
    );
  }
}

export default MainPage;
