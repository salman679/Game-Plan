import { useDispatch } from 'react-redux';

import { CheckCircle } from 'lucide-react';
import { setCurrentStep } from '../../features/authSlice';
import Card from '../ui/Card';
import Button from '../ui/Button';

const SuccessScreen = () => {
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(setCurrentStep('login'));
  };

  return (
    <Card className="text-center">
      <div className="mb-8">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-full">
          <div className="w-8 h-8 bg-indigo-600 rounded-full"></div>
        </div>
        <div className="mb-6">
          <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
        </div>
        <h1 className="mb-4 text-2xl font-bold text-gray-900">Congratulations</h1>
        <p className="mb-8 text-gray-600">
          Your password has been updated, please<br />
          change your password regularly
        </p>
      </div>

      <Button onClick={handleLogin} className="w-full">
        LOG IN
      </Button>
    </Card>
  );
};

export default SuccessScreen;