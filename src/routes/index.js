import Home from '~/pages/Home';
import Explore from '~/pages/Explore';
import Account from '~/pages/Account_Settings';
import Profile from '~/pages/Profile';
import Saved from '~/pages/Saved';
import Reels from '~/pages/Reels';


// Auth
import Login from '~/components/Layouts/Auth/Login'
import Register from '~/components/Layouts/Auth/Register'

//setting account
import AccountPrivacy from '~/pages/Account_Settings/Settings/AccountPrivacy';
import Account_Status from '~/pages/Account_Settings/Settings/Account_Status';
import BlockedAccounts from '~/pages/Account_Settings/Settings/BlockedAccounts';
import CloseFriend from '~/pages/Account_Settings/Settings/CloseFriend';
import Comments from '~/pages/Account_Settings/Settings/Comments';
import LikeShareCounts from '~/pages/Account_Settings/Settings/LikeShareCounts';

const publicRoutes = [
  { path: '/', component: Home },
  { path: '/SocializeIt/explore', component: Explore },
  { path: '/SocializeIt/account', component: Account },
  { path: '/SocializeIt/profile/:username', component: Profile },
  { path: '/SocializeIt/profile/:username/saved/:name_folder/:folderId', component: Saved },
  { path: '/SocializeIt/reels', component: Reels },

  // Auth
  { path: '/SocializeIt/auth/login', component: Login },
  { path: '/SocializeIt/auth/register', component: Register },
];

const accountSettingsRoutes = [
  //setting account
  { path: '/SocializeIt/account/settings/v2/account_privacy', component: AccountPrivacy },
  { path: '/SocializeIt/account/settings/v2/close_friends', component: CloseFriend },
  { path: '/SocializeIt/account/settings/v2/blocked_accounts', component: BlockedAccounts },
  { path: '/SocializeIt/account/settings/help/account_status', component: Account_Status },
  { path: '/SocializeIt/account/settings/comments', component: Comments },
  { path: '/SocializeIt/account/settings/likes_count', component: LikeShareCounts },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes, accountSettingsRoutes};
