
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { FileText as FileTextIcon } from "lucide-react";

const History = () => {
  const { isAuthenticated, openAuthDialog, logout } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
      openAuthDialog();
    }
  }, [isAuthenticated, navigate, openAuthDialog]);

  // Mock data for CV history
  const cvHistory = [
    {
      id: "cv-1",
      name: "Developer_CV_2023.pdf",
      date: "April 19, 2025",
      size: "420 KB",
      improvementScore: 7.5,
    },
    {
      id: "cv-2",
      name: "Product_Manager_CV.pdf",
      date: "April 15, 2025",
      size: "380 KB",
      improvementScore: 8.2,
    },
    {
      id: "cv-3",
      name: "UX_Designer_Application.pdf",
      date: "April 10, 2025",
      size: "410 KB", 
      improvementScore: 6.8,
    },
  ];

  if (!isAuthenticated) return null;

  return (
    <Layout isLoggedIn={isAuthenticated} onLogin={openAuthDialog} onLogout={logout}>
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h1 className="text-3xl font-bold text-cv-blue">CV History</h1>
            <p className="text-cv-gray mt-2">View and manage your past CV analyses</p>
          </div>
        </div>

        <div className="space-y-6">
          {cvHistory.map(item => (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="p-4 bg-blue-50 flex items-center justify-center md:h-full">
                  <FileTextIcon className="h-8 w-8 text-cv-blue" />
                </div>
                
                <CardContent className="flex-grow grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-cv-gray">Uploaded: {item.date}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-cv-gray">Size</p>
                    <p>{item.size}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-cv-gray">Improvement Score</p>
                    <p className="font-semibold text-cv-blue">{item.improvementScore}/10</p>
                  </div>
                  
                  <div className="flex space-x-2 items-center md:justify-end">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate(`/history/${item.id}`)}
                    >
                      View Analysis
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                    >
                      Download
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {cvHistory.length === 0 && (
          <div className="text-center py-12">
            <p className="text-cv-gray text-lg">You haven't uploaded any CVs yet.</p>
            <Button className="mt-4" onClick={() => navigate("/")}>
              Upload Your First CV
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default History;
