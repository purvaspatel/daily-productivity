'use client'
import { useEffect } from "react";

declare global {
  interface Window {
    reminderIntervals: NodeJS.Timeout[];
  }
}

const welcomeMessages = [
  "Hey, I've got your back! Take a deep breath – relax and start your work. You got this! 🚀",
  "Welcome! Breathe in, breathe out... Now go conquer your tasks! 💪",
  "New day, new goals! Let's stay focused and hydrated! 🌟",
  "Relax your shoulders, unclench your jaw, and let's have a productive day! 😌",
  "Work hard, but don't forget to take care of yourself too! 💙",
  "One step at a time! Remember, small progress is still progress. 🏆"
];

const remindersSchedule = [
  { message: "Hydration check! Grab a glass of water! 💧", interval: 45 * 60 * 1000 }, // 45 minutes
  { message: "Look away! 20 seconds focus on something 20 feet away. 👀", interval: 20 * 60 * 1000 }, // 20 minutes
  { message: "Time to stretch! Your back and neck will thank you later. 🙆", interval: 40 * 60 * 1000 }, // 40 minutes
  { message: "Step away for a quick break! Your mind needs a refresh. ⏳", interval: 60 * 60 * 1000 }, // 60 minutes
  { message: "Hey, have you had your lunch yet? 🍽️ Fuel up for the afternoon!", time: "12:30" },
  { message: "Snack time! Grab something healthy to keep your energy up. 🍏", time: "16:00" },
  { message: "Dinner time approaching! Make sure to get a nutritious meal. 🥗", time: "19:30" },
  { message: "It's late! What's keeping you up? Try unwinding for better sleep. 🌙", time: "23:30" }
];

function scheduleNotifications() {
  if (!("Notification" in window)) {
    alert("This browser does not support system notifications.");
    return;
  }

  Notification.requestPermission().then(permission => {
    if (permission === "granted") {
      // Welcome notification (once)
      setTimeout(() => {
        const welcomeMessage = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
        new Notification("Welcome!", { body: welcomeMessage });
      }, 300);

      // Schedule interval-based reminders
      const intervals: NodeJS.Timeout[] = [];

      remindersSchedule.forEach(({ message, interval, time }) => {
        if (interval) {
          // Set up recurring notifications using setInterval
          const intervalId = setInterval(() => {
            new Notification("Reminder", { body: message });
          }, interval);

          intervals.push(intervalId);
        } else if (time) {
          // Check every minute if it's time for a time-based notification
          const timeCheckId = setInterval(() => {
            const now = new Date();
            const currentTime = now.getHours() + ":" + now.getMinutes();
            const [targetHour, targetMinute] = time.split(":");
            const targetTime = targetHour + ":" + targetMinute;

            // If current time matches target time (checking just hours and minutes)
            if (currentTime === targetTime) {
              new Notification("Reminder", { body: message });
            }
          }, 60 * 1000); // Check every minute

          intervals.push(timeCheckId);
        }
      });

      // Store intervals in window object to prevent garbage collection
      window.reminderIntervals = intervals;
    }
  });
}

export default function Home() {
  useEffect(() => {
    const cleanup = scheduleNotifications();

    // Cleanup function to clear all intervals when component unmounts
    return () => {
      if (window.reminderIntervals) {
        window.reminderIntervals.forEach(intervalId => clearInterval(intervalId));
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4 font-inter overflow-hidden">
      <div className="w-full text-center">
        <h1 className="text-4xl font-bold mb-5 mt-20">The Only Notifications You'll Actually Love</h1>
        <p className="text-xl">
          Stay healthy, hydrated and productive with mindful reminders throughout your workday
        </p>
        <p className="mt-5 text-2xl"><i>Enable the notifications and keep this tab open!</i></p>

        <div className="mb-8">
          <img
            src="main.svg"
            alt="Person working at desk with a lamp"
            className="mx-auto mix-blend-darken"
          />
        </div>
      </div>

      {/* Feedback Button */}
      <a 
        href="mailto:purvaspatel1241@gmail.com"
        className="bg-black fixed bottom-5 left-5 text-white px-4 py-2 "
      >
        Feedback
      </a>
    </div>
  );
}
