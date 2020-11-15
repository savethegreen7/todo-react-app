import React from 'react';

import NavbarComponent from './components/NavbarComponent';
import Container from '@material-ui/core/Container';
import TaskContextProvider from './contexts/TaskContext';
import TodoListComponent from './components/TodoListComponent';

function App() {
  return (
    <Container maxWidth="md">
      <TaskContextProvider>
        <NavbarComponent></NavbarComponent>
        <TodoListComponent></TodoListComponent>
      </TaskContextProvider>
    </Container>
  );
}

export default App;


// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
