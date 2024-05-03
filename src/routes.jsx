import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import EditContact from './pages/EditContact';
import NewContact from './pages/NewContact';

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/new" component={NewContact} />
      <Route path="/edit/:id"  component={EditContact} />
    </Switch>
  )
}

export default Routes;
