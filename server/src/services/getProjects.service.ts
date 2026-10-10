import { db } from '@/lib/firebase/config';
import { ServiceResponse } from '@/types';
import { collection, getDocs } from 'firebase/firestore';

export default async function getProjects<T>(): Promise<ServiceResponse<T>> {
  try {
    const docCol = collection(db, 'projects');
    const docsSnapshot = await getDocs(docCol);

    const projectsList = docsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as T;

    return {
      success: true,
      data: projectsList,
    };
  } catch {
    return {
      success: false,
      error: { code: 'DATA_NOT_FOUND', message: "Data can't be found" },
    };
  }
}
