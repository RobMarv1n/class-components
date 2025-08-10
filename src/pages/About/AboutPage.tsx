import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="flex flex-col p-8 gap-4 justify-center items-center">
      <h1 className="text-2xl font-bold">About This App</h1>
      <p className="">
        This is a demo Single Page Application displaying characters (e.g. from
        the Rick and Morty API).
      </p>

      <Link to="/" className=" hover:underline transition-colors duration-200">
        Go back to homepage
      </Link>

      <Link
        to="https://rs.school"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
      >
        <img
          src="/logo-rs.svg"
          alt="RS School Logo"
          className="w-[120px] h-[62px]"
        />
      </Link>
    </div>
  );
}
