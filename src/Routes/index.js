import config from '~/config';

// Layout
import { HeaderOnly } from '~/layouts';

// Pages
import Home from '~/Pages/Home';
import Following from '~/Pages/Following';
import Upload from '~/Pages/Upload';
import Profile from '~/Pages/Profile';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.following, component: Following },
    { path: config.routes.upload, component: Upload, layout: HeaderOnly },
    { path: config.routes.profile, component: Profile },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
