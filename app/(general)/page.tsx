import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface featureProps {
  title: string;
  description: string;
  icon: string

}

  const features: featureProps[] = [
    {
      title: "Comprehensive Courses",
      description:
      "Access a wide range of carefully curated courses designed by industry experts.",
      icon: "📚"
    }, {
      title: "Interactive Learning",
      description:
      "Engage with interactive content, quizzes, and assignments to enhance your learning experience.",
      icon: "🎮"
    },
    {
      title: "Progress Tracking",
      description:
      "Monitor your progress and achievements with a detailed analytics and personalized dashboards.",
      icon:"📊"
    },
    {
      title: "Communtiy Support",
      description:"join a vibrant community of learners and instructors to collaborate and share knowledge.",
      icon: "👥"
    }
  ]


export default function App() {

  return (
   <>
    <section className='relative py-20'>
      <div className='flex flex-col items-center text-center space-y-8 text-xl'>
        <Badge variant={'outline'}>
          The Future Of Online Education
        </Badge>
        <h1 className='text-4xl md:text-6xl font-bold'>Elevate your Learning Experience</h1>
        <p className='max-w-[700] text-muted-foreground md:text-xl'>
          Discover a new way to learn with our modern, interactive learning
          management system. Access high-quality courses anytime, anywhere.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 mt-8'>
          <Link href="/courses"
          className={buttonVariants({
            size: "lg",
          })}>Explore Courses</Link>
          <Link href="/login"
          className={buttonVariants({
            size:"lg",
            variant: "outline",
          })}
          >Login</Link>
        </div>
      </div>
    </section>
    <section className='grid mb-32 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {features.map((feature,index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow p-4">
              <CardHeader>
                <div className='text-4x mb-2'>
                  {feature.icon}
                </div>
              </CardHeader>
              <CardTitle className='ml-4'>
                {feature.title}
              </CardTitle>
              <CardContent>
                <p className='text-muted-foreground'>{feature.description}</p>
              </CardContent>
          </Card>
        ))}
    </section>
   </>
  );
}
