import { useDispatch } from 'react-redux';
import Button from '../Button/Button';
import { baseService } from '../../../app/api/service/base.service';

export default function ResetCacheButton() {
  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(baseService.util.resetApiState());
  };
  return <Button onClick={handleReset}>Reset cache</Button>;
}
