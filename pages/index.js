import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Добро пожаловать в NewShoeStore!</h1>
      <Link href="/catalog" className="text-xl text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">
        Перейти в каталог
      </Link>
    </div>
  )
}