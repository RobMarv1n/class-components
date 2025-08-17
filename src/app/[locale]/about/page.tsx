import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '../../../i18n/navigation';

export default function AboutPage() {
  const t = useTranslations('About');

  return (
    <div className="flex flex-col p-8 gap-4 justify-center items-center">
      <h1 className="text-2xl font-bold">{t('title')}</h1>
      <p className="">{t('description')}</p>

      <Link
        href="/"
        className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
      >
        {t('back')}
      </Link>

      <Link
        href="https://rs.school"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
      >
        <Image
          width={120}
          height={62}
          src="/logo-rs.svg"
          alt="RS School Logo"
        />
      </Link>
    </div>
  );
}
