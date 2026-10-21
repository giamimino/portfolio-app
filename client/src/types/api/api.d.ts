import { ApiFailure, ApiSuccess } from '../global';
import { ExpPanelAboutType, ProjectType } from '../project';

declare namespace Api {
  namespace v1 {
    namespace contact {
      type Request = {
        template: string;
      };

      type Response =
        ApiFailure | ApiSuccess<{ code: string; message: string }>;
    }
    namespace about {
      type Response =
        | ApiFailure
        | ApiSuccess<
            {
              id: string;
              createdAt: Timestamp;
              text: string;
              title: string;
            }[]
          >;
    }

    namespace projects {
      type Response = ApiFailure | ApiSuccess<ProjectType[]>;

      namespace project {
        type Response = ApiFailure | ApiSuccess<ProjectType>;
      }
    }

    namespace landing_page {
      type Response =
        | ApiFailure
        | ApiSuccess<{
            about: ApiSuccess<ExpPanelAboutType[]>;
            projects: ApiSuccess<ProjectType[]>;
          }>;
    }
  }
}
