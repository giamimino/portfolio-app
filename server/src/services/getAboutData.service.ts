import { ApiError } from '@/lib/api/response';
import { db } from '@/lib/firebase/config';
import { ServiceResponse } from '@/types';
import { collection, getDocs } from 'firebase/firestore';

export default async function getAboutData<T>(): Promise<ServiceResponse<T>> {
  try {
    const docCollection = collection(db, 'about');
    const docSnap = await getDocs(docCollection);

    const aboutList = docSnap.docs.map(doc => ({
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
