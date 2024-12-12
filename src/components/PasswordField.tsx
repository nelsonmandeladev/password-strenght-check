import { useState, useEffect } from 'react';
import { Eye, EyeOff, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface PasswordRequirement {
  text: string;
  validator: (password: string) => boolean;
}

const requirements: PasswordRequirement[] = [
  {
    text: 'At least 8 characters long',
    validator: (password) => password.length >= 8,
  },
  {
    text: 'Contains at least one uppercase letter',
    validator: (password) => /[A-Z]/.test(password),
  },
  {
    text: 'Contains at least one lowercase letter',
    validator: (password) => /[a-z]/.test(password),
  },
  {
    text: 'Contains at least one number',
    validator: (password) => /[0-9]/.test(password),
  },
  {
    text: 'Contains at least one special character',
    validator: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
  },
];

const getStrengthPercentage = (password: string): number => {
  if (!password) return 0;
  const meetsRequirements = requirements.filter((req) => req.validator(password));
  return (meetsRequirements.length / requirements.length) * 100;
};

const getStrengthColor = (strength: number): string => {
  if (strength < 33) return 'bg-destructive';
  if (strength < 66) return 'bg-yellow-500';
  return 'bg-green-500';
};

export function PasswordField() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setStrength(getStrengthPercentage(password));
  }, [password]);

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => !password && setIsFocused(false)}
          className="pr-10"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4 text-muted-foreground" />
          ) : (
            <Eye className="h-4 w-4 text-muted-foreground" />
          )}
        </Button>
      </div>

      <div
        className={cn(
          'space-y-2 transition-all duration-200',
          isFocused || password
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        )}
      >
        <div className="space-y-1">
          <Progress
            value={strength}
            className={cn('h-2 w-full transition-colors', getStrengthColor(strength))}
          />
          <p className="text-sm text-muted-foreground">
            Password strength:{' '}
            <span
              className={cn(
                'font-medium transition-colors',
                strength < 33
                  ? 'text-destructive'
                  : strength < 66
                  ? 'text-yellow-500'
                  : 'text-green-500'
              )}
            >
              {strength < 33
                ? 'Weak'
                : strength < 66
                ? 'Medium'
                : 'Strong'}
            </span>
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Password requirements:</p>
          <ul className="text-sm space-y-1">
            {requirements.map((requirement, index) => {
              const isValid = requirement.validator(password);
              return (
                <li
                  key={index}
                  className={cn(
                    'flex items-center space-x-2 transition-colors duration-200',
                    isValid ? 'text-muted-foreground' : 'text-muted-foreground/80'
                  )}
                >
                  <div className="transition-transform duration-200">
                    {isValid ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <X className="h-4 w-4 text-destructive" />
                    )}
                  </div>
                  <span>{requirement.text}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}