import { useEffect, useState } from 'react';

import './App.css';
import CardList from './components/card-list/card-list'
import SearchBox from './components/search-box/search-box';


const App = () => {
  const [searchField, setSearchField] = useState('');
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, []);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchField]);
  // render() {
  //   const { monsters, searchField } = this.state;
  //   const { onSearchChange } = this;
  //   const filteredMonsters = monsters  .filter((monster) => {
  //     return monster.name.toLocaleLowerCase().includes(searchField);
  //   });
  return (
    <div className="App">
      <h1 className='mainHeading'>Monsters Rolodex</h1>
      <SearchBox className='search-box'
        onChangeHandler={onSearchChange}
        placeholder='search monsters' />
      <CardList monsters={filteredMonsters} />
    </div>
  );
}



export default App;
