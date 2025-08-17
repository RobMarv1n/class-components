import { useTranslations } from 'next-intl';
import { Link } from '../../i18n/navigation';

export default function NotFoundPage() {
  const t = useTranslations('NotFound');

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
      <Link href="/">{t('back')}</Link>
    </div>
  );
}
