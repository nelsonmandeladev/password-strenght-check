import { PasswordField } from '@/components/PasswordField';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter">Create Password</h1>
          <p className="text-sm text-muted-foreground">
            Start typing to see password requirements
          </p>
        </div>
        <PasswordField />
      </div>
    </div>
  );
}

export default App;