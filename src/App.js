import React, { useEffect, useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { supabase } from './supabaseClient';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

function App() {
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);

      supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          history.push('/dashboard');
        }
      });
    };
    getSession();
  }, [history]);

  const handleLogin = async (provider) => {
    await supabase.auth.signInWithOAuth({ provider });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    history.push('/');
  };

  return (
    <div className="container mx-auto p-4">
      <Switch>
        <Route path="/dashboard">
          <Dashboard user={user} onLogout={handleLogout} />
        </Route>
        <Route path="/">
          <Home onLogin={handleLogin} user={user} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
