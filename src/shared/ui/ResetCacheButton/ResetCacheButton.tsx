import { useDispatch } from 'react-redux';
import Button from '../Button/Button';
import { baseService } from '../../api/service/base.service';
import { useTranslations } from 'next-intl';

export default function ResetCacheButton() {
  const dispatch = useDispatch();
  const t = useTranslations('ResetCache');

  const handleReset = () => {
    dispatch(baseService.util.resetApiState());
  };
  return <Button onClick={handleReset}>{t('title')}</Button>;
}
