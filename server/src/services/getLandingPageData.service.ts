import { db } from '@/lib/firebase/config';
import { ServiceResponse } from '@/types';
import { collection, getDocs } from 'firebase/firestore';

export default async function getLandingPageData<T>(): Promise<
  ServiceResponse<T>
> {
  try {
    const aboutRef = collection(db, 'exp-panel-about');
    const docs = await getDocs(aboutRef);

    const aboutList = docs.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as T;

    return { success: true, data: aboutList };
  } catch {
    return {
      success: false,
      error: { code: 'DATA_NOT_FOUND', message: "Data can't be found" },
    };
  }
}
