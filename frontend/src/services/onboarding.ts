import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebaseconfig";

export const saveOnboardingData = async (
  uid: string,
  data: {
    role: string;
    skills: Record<string, number>;
    timeCommitment: string;
  }
) => {
  await setDoc(
    doc(db, "users", uid),
    {
      onboarding: {
        role: data.role,
        skills: data.skills,
        timeCommitment: data.timeCommitment,
        completedAt: serverTimestamp(),
      },
      onboardingCompleted: true,
    },
    { merge: true }
  );
};
