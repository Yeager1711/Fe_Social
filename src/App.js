import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes, accountSettingsRoutes } from '~/routes';
import DefaultLayout from '~/components/Layouts/DefaultLayout';
import DefaultLayoutAdmin from '~/components/Layouts/DefaultLayoutAdmin';
import Account from '~/pages/Account_Settings';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          {publicRoutes.map((route, index) => {
            const Layout = route.Layout === null ? Fragment : DefaultLayout;
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}

          {/* Private Routes */}
          {privateRoutes.map((route, index) => {
            const Layout = route.Layout === null ? Fragment : DefaultLayoutAdmin;
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}

          {/* Account Settings Routes - nested inside Account */}
          <Route path="/SocializeIt/account/*" element={<Account />}>
            {accountSettingsRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path.replace('/SocializeIt/account/', '')} 
                element={<route.component />}
              />
            ))}
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
