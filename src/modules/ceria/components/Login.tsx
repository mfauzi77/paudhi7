import React, { useState } from 'react';
import { useTheme } from './ThemeContext';

const Login: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const { login } = useTheme();
  const [username, setUsername] = useState('adminceria@kemenkopmk.go.id');
  const [password, setPassword] = useState('adminceria');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await login(username, password);
    if (ok) onSuccess();
    else setError('Login gagal. Gunakan password: admin (demo).');
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white dark:bg-slate-800 p-6 rounded shadow">
        <h1 className="text-xl font-bold mb-4">Login Admin</h1>
        <div className="text-xs text-slate-600 dark:text-slate-300 mb-3">Demo akun otomatis terisi: adminceria@kemenkopmk.go.id / adminceria</div>
        <input className="w-full mb-3 px-3 py-2 rounded bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="password" className="w-full mb-3 px-3 py-2 rounded bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        {error && <div className="text-sm text-red-600 mb-3">{error}</div>}
        <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default Login;


