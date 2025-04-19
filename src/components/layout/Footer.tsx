
const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="container mx-auto px-4">
        <div className="text-center text-cv-gray text-sm">
          <p>© {new Date().getFullYear()} CV Wizard. All rights reserved.</p>
          <p className="mt-2">Powered by OpenAI and Supabase</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
