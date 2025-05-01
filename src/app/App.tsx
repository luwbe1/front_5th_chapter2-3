import Header from '@/widgets/ui/Header.tsx';
import Footer from '@/widgets/ui/Footer.tsx';
import PostsManagerPage from '@/pages/PostsManagerPage.tsx';

// App
const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <PostsManagerPage />
      </main>
      <Footer />
    </div>
  );
};

export default App;
