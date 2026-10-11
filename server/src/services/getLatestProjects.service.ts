import { db } from '@/lib/firebase/config';
import { ServiceResponse } from '@/types';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';

export default async function getLatestProjects<T>(): Promise<
  ServiceResponse<T>
> {
  try {
    const projectsRef = collection(db, 'projects');

    const projectsQuery = query(
      projectsRef,
      orderBy('created_at', 'desc'),
      limit(6),
    );

    const projectsSnapshot = await getDocs(projectsQuery);

    const latestProjects = projectsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as T;

    return { success: true, data: latestProjects };
  } catch {
    return {
      success: false,
      error: { code: 'DATA_NOT_FOUND', message: "Data can't be found" },
    };
  }
}
