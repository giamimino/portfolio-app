import { db } from '@/lib/firebase/config';
import { ServiceResponse } from '@/types';
import { doc, getDoc } from 'firebase/firestore';

export default async function getProject<T>(
  id: string,
): Promise<ServiceResponse<T>> {
  try {
    const docRef = doc(db, 'projects', id);
    const docSnapshot = await getDoc(docRef);

    // needed zod validation here, expected in v0.6.0

    const project = docSnapshot.data() as T;
    return {
      success: true,
      data: project,
    };
  } catch {
    return {
      success: false,
      error: { code: 'DATA_NOT_FOUND', message: "Data can't be found" },
    };
  }
}
