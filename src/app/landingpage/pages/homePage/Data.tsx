interface HomeObject {
    lightBg: boolean;
    lightText: boolean;
    lightTextDesc: boolean;
    topLine: string;
    headline: string;
    description: string;
    buttonLabel: string;
    imgStart?: string; // Optional property
    img: string;
    alt: string;
  }
  
  export const homeObjOne: HomeObject = {
    lightBg: false,
    lightText: true,
    lightTextDesc: true,
    topLine: 'Memo Management',
    headline: 'Seamless e-Memo Tracking',
    description:
      'Manage and track your memos effortlessly. Our app allows you to create, assign, and monitor memos, ensuring that no task is left behind.',
    buttonLabel: 'Get Started',
    imgStart: '',
    img: 'images/svg-1.svg', // Kept original image
    alt: 'Memo Management',
  };
  
  export const homeObjTwo: HomeObject = {
    lightBg: false,
    lightText: true,
    lightTextDesc: true,
    topLine: 'Memo State Tracking',
    headline: 'Monitor Memo Status in Real-Time',
    description:
      'Keep track of your memos from creation to completion. Stay updated with real-time status, ensuring memos are reviewed, approved, and finalized on time.',
    buttonLabel: 'Learn More',
    imgStart: '',
    img: 'images/svg-5.svg', // Kept original image
    alt: 'Memo State Tracking',
  };
  
  export const homeObjThree: HomeObject = {
    lightBg: true,
    lightText: false,
    lightTextDesc: false,
    topLine: 'Time & Location Management',
    headline: 'Track Memo Activity by Time and Place',
    description:
      'Organize memos by setting specific times and locations for tasks. Keep track of when memos are sent, reviewed, and approved, ensuring full control over your workflow.',
    buttonLabel: 'Start Now',
    imgStart: 'start',
    img: 'images/svg-7.svg', // Kept original image
    alt: 'Time & Location Management',
  };
  
  export const homeObjFour: HomeObject = {
    lightBg: false,
    lightText: true,
    lightTextDesc: true,
    topLine: 'Progress Insights',
    headline: 'Analyze Memo Progress',
    description:
      'Get detailed insights into the progress of your memos. Our app helps you track their status, allowing for informed decisions and improved productivity.',
    buttonLabel: 'Sign Up Now',
    imgStart: 'start',
    img: 'images/svg-8.svg', // Kept original image
    alt: 'Progress Insights',
  };
  