import type { NSAccessDenied } from './AccessDenied/AccessDenied.type';
import type { NSError } from './Error.type';
import type { NSMaintenance } from './Maintenance/Maintenance.type';
import type { NSPageError } from './PageError/PageError.type';
import type { NSPageNotFound } from './PageNotFound/PageNotFound.type';
import type { NSProjectNotFound } from './ProjectNotFound/ProjectNotFound.type';

declare namespace NSErrors {
  namespace Error {
    type Props = NSError.Props;
  }

  namespace AccessDenied {
    type Props = NSAccessDenied.Props;
  }

  namespace Maintenance {
    type Props = NSMaintenance.Props;
  }

  namespace PageError {
    type Props = NSPageError.Props;
  }

  namespace PageNotFound {
    type Props = NSPageNotFound.Props;
  }

  namespace ProjectNotFound {
    type Props = NSProjectNotFound.Props;
  }
}

export type { NSErrors };
