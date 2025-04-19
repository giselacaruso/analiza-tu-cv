
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import FeedbackDisplay, { Feedback } from "@/components/FeedbackDisplay";
import { ArrowUp as ArrowUpIcon, FileText as FileTextIcon } from "lucide-react";

const CVDetail = () => {
  const { isAuthenticated, openAuthDialog, logout } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [cvData, setCvData] = useState<{
    name: string;
    date: string;
    size: string;
    improvementScore: number;
    feedback: Feedback;
  } | null>(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
      openAuthDialog();
    }
  }, [isAuthenticated, navigate, openAuthDialog]);

  // Fetch CV data - this would normally come from Supabase
  useEffect(() => {
    if (isAuthenticated && id) {
      setLoading(true);
      
      // Mock API call to get CV data
      setTimeout(() => {
        // Mock data for the specific CV
        const mockData = {
          name: id === "cv-1" ? "Developer_CV_2023.pdf" : "Product_Manager_CV.pdf",
          date: id === "cv-1" ? "April 19, 2025" : "April 15, 2025",
          size: id === "cv-1" ? "420 KB" : "380 KB",
          improvementScore: id === "cv-1" ? 7.5 : 8.2,
          feedback: {
            overall: "Your CV demonstrates strong technical skills and education. However, it could benefit from more quantifiable achievements and a clearer structure. Consider adding metrics to showcase your impact and reorganizing sections for better readability.",
            sections: [
              {
                title: "Strong Technical Skills",
                content: "Your technical skills section is comprehensive and showcases relevant technologies for your target roles. The organization by categories (languages, frameworks, tools) makes it easy to scan.",
                type: "positive" as const
              },
              {
                title: "Education Presentation",
                content: "Your educational background is well presented with clear details on degrees, institutions, and graduation dates.",
                type: "positive" as const
              },
              {
                title: "Work Experience Impact",
                content: "Your work experience lacks quantifiable achievements. Add metrics to demonstrate your impact (e.g., 'Improved application performance by 40%' rather than just 'Improved application performance').",
                type: "improvement" as const
              },
              {
                title: "CV Structure",
                content: "The overall structure could be improved by prioritizing most relevant information first. Consider moving your work experience above education if you're not a recent graduate.",
                type: "improvement" as const
              },
              {
                title: "Personal Projects",
                content: "Adding 1-2 relevant personal projects could strengthen your application, especially if they demonstrate skills relevant to your target position.",
                type: "suggestion" as const
              },
              {
                title: "ATS Optimization",
                content: "Consider optimizing your CV for Applicant Tracking Systems by incorporating more keywords from job descriptions you're targeting.",
                type: "suggestion" as const
              }
            ]
          }
        };
        
        setCvData(mockData);
        setLoading(false);
      }, 1000);
    }
  }, [isAuthenticated, id]);

  if (!isAuthenticated) return null;
  
  return (
    <Layout isLoggedIn={isAuthenticated} onLogin={openAuthDialog} onLogout={logout}>
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate("/history")}
              className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors"
            >
              <ArrowUpIcon className="h-5 w-5 text-cv-blue transform rotate-90" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-cv-blue">CV Analysis</h1>
              {!loading && cvData && (
                <p className="text-cv-gray mt-1">{cvData.name}</p>
              )}
            </div>
          </div>
          <div className="mt-4 md:mt-0 space-x-3">
            <Button variant="outline">Download CV</Button>
            <Button>Re-Analyze</Button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-cv-blue border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : cvData ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Upload Date</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <FileTextIcon className="h-5 w-5 mr-2 text-cv-gray" />
                    <p className="text-lg font-medium">{cvData.date}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">File Size</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-medium">{cvData.size}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Improvement Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-cv-blue">{cvData.improvementScore}/10</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-12">
              <h2 className="text-2xl font-semibold mb-8 text-center">Detailed Analysis</h2>
              <FeedbackDisplay feedback={cvData.feedback} />
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-cv-gray text-lg">CV not found or error loading data.</p>
            <Button className="mt-4" onClick={() => navigate("/history")}>
              Back to History
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CVDetail;
