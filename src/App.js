import React, { Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import ThemeSelector from './layouts/theme/ThemeSelector';
import Loader from './layouts/loader/Loader';
import Loadable from './layouts/loader/Loadable';
 
//Autenticacion del logeo
import { ProtectedRoute } from './routes/Enrutador';
import { AuthProvider } from './Context/authContext';
/****Layouts*****/ 
const FullLayout = Loadable(lazy(() => import('./layouts/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('./layouts/BlankLayout')));
/***** Pages ****/

const Analytical = Loadable(lazy(() => import('./views/dashboards/Analytical')));
const Demographical = Loadable(lazy(() => import('./views/dashboards/Demographical')));
const Modern = Loadable(lazy(() => import('./views/dashboards/Modern')));
const About = Loadable(lazy(() => import('./views/About')));

/***** Apps ****/
const Notes = Loadable(lazy(() => import('./views/apps/notes/Notes')));
const Chat = Loadable(lazy(() => import('./views/apps/chat/Chat')));
const Contacts = Loadable(lazy(() => import('./views/apps/contacts/Contacts')));
const Calendar = Loadable(lazy(() => import('./views/apps/calendar/CalendarApp')));
const Email = Loadable(lazy(() => import('./views/apps/email/Email')));
const Shop = Loadable(lazy(() => import('./views/apps/ecommerce/Shop')));
const ShopDetail = Loadable(lazy(() => import('./views/apps/ecommerce/ShopDetail')));
const Treeview = Loadable(lazy(() => import('./views/apps/treeview/TreeView')));
const TicketList = Loadable(lazy(() => import('./views/apps/ticket/TicketList')));
const TicketDetail = Loadable(lazy(() => import('./views/apps/ticket/TicketDetail')));

/***** Ui Elements ****/
const Alerts = Loadable(lazy(() => import('./views/ui/Alerts')));
const Badges = Loadable(lazy(() => import('./views/ui/Badges')));
const Buttons = Loadable(lazy(() => import('./views/ui/Buttons')));
const Cards = Loadable(lazy(() => import('./views/ui/Cards')));
const Grid = Loadable(lazy(() => import('./views/ui/Grid')));
const Tables = Loadable(lazy(() => import('./views/ui/Tables')));
const Forms = Loadable(lazy(() => import('./views/ui/Forms')));
const Breadcrumbs = Loadable(lazy(() => import('./views/ui/Breadcrumbs')));
const Dropdowns = Loadable(lazy(() => import('./views/ui/DropDown')));
const BtnGroup = Loadable(lazy(() => import('./views/ui/BtnGroup')));
const Collapse = Loadable(lazy(() => import('./views/ui/Collapse')));
const ListGroup = Loadable(lazy(() => import('./views/ui/ListGroup')));
const Modal = Loadable(lazy(() => import('./views/ui/Modal')));
const Navbar = Loadable(lazy(() => import('./views/ui/Navbar')));
const Nav = Loadable(lazy(() => import('./views/ui/Nav')));
const Pagination = Loadable(lazy(() => import('./views/ui/Pagination')));
const Popover = Loadable(lazy(() => import('./views/ui/Popover')));
const Progress = Loadable(lazy(() => import('./views/ui/Progress')));
const Spinner = Loadable(lazy(() => import('./views/ui/Spinner')));
const Tabs = Loadable(lazy(() => import('./views/ui/Tabs')));
const Toasts = Loadable(lazy(() => import('./views/ui/Toasts')));
const Tooltip = Loadable(lazy(() => import('./views/ui/Tooltip')));

/***** Form Layout Pages ****/
const FormBasic = Loadable(lazy(() => import('./views/form-layouts/FormBasic')));
const FormGrid = Loadable(lazy(() => import('./views/form-layouts/FormGrid')));
const FormGroup = Loadable(lazy(() => import('./views/form-layouts/FormGroup')));
const FormInput = Loadable(lazy(() => import('./views/form-layouts/FormInput')));
const FormEditor = Loadable(lazy(() => import('./views/form-editor/FormEditor')));

/***** Form Pickers Pages ****/
const Datepicker = Loadable(lazy(() => import('./views/form-pickers/DateTimePicker')));
const TagSelect = Loadable(lazy(() => import('./views/form-pickers/TagSelect')));

/***** Form Validation Pages ****/
const FormValidate = Loadable(lazy(() => import('./views/form-validation/FormValidation')));
const FormSteps = Loadable(lazy(() => import('./views/form-steps/Steps')));

/***** Table Pages ****/
const Basictable = Loadable(lazy(() => import('./views/tables/TableBasic')));
const CustomReactTable = Loadable(lazy(() => import('./views/tables/CustomReactTable')));
const ReactBootstrapTable = Loadable(lazy(() => import('./views/tables/ReactBootstrapTable')));

/***** Chart Pages ****/
const ApexCharts = Loadable(lazy(() => import('./views/charts/ApexCharts')));
const ChartJs = Loadable(lazy(() => import('./views/charts/ChartJs')));

/***** Sample Pages ****/
const StarterKit = Loadable(lazy(() => import('./views/sample-pages/StarterKit')));
const Profile = Loadable(lazy(() => import('./views/sample-pages/Profile')));
const Gallery = Loadable(lazy(() => import('./views/sample-pages/Gallery')));
const SearchResult = Loadable(lazy(() => import('./views/sample-pages/SearchResult')));
const HelperClass = Loadable(lazy(() => import('./views/sample-pages/HelperClass')));

/***** Icon Pages ****/
const Bootstrap = Loadable(lazy(() => import('./views/icons/Bootstrap')));
const Feather = Loadable(lazy(() => import('./views/icons/Feather')));

/***** Map Pages ****/
const CustomVectorMap = Loadable(lazy(() => import('./views/maps/CustomVectorMap')));

/***** Widget Pages ****/
const Widget = Loadable(lazy(() => import('./views/widget/Widget')));

/***** CASL Access Control ****/
const CASL = Loadable(lazy(() => import('./views/apps/accessControlCASL/AccessControl')));

/***** Auth Pages ****/
const Error = Loadable(lazy(() => import('./views/auth/Error')));
const RegisterFormik = Loadable(lazy(() => import('./views/auth/RegisterFormik')));
const LoginFormik = Loadable(lazy(() => import('./views/auth/LoginFormik')));
const Maintanance = Loadable(lazy(() => import('./views/auth/Maintanance')));
const LockScreen = Loadable(lazy(() => import('./views/auth/LockScreen')));
const RecoverPassword = Loadable(lazy(() => import('./views/auth/RecoverPassword')));

/*****Routes******/

const App = () => {
  const direction = useSelector((state) => state.customizer.isRTL);
  const isMode = useSelector((state) => state.customizer.isDark);
  return (
    <Suspense fallback={<Loader />}>
      <div className={`${direction ? 'rtl' : 'ltr'} ${isMode ? 'dark' : ''}`} dir={direction ? 'rtl' : 'ltr'}>
        <AuthProvider>
          <ThemeSelector />
          <Routes>
            <Route path='/auth' element={<BlankLayout />} >
              <Route path='404' element={<Error />} />,
              <Route path='*' element={<Navigate to="/auth/404" />} />,
              <Route path='registerformik' element={<RegisterFormik />} />,
              <Route path='loginformik' element={<LoginFormik />} />,
              <Route path='maintanance' element={<Maintanance />} />,
              <Route path='lockscreen' element={<LockScreen />} />,
              <Route path='recoverpwd' element={<RecoverPassword />} />,
            </Route>
            <Route path='/' element={<ProtectedRoute><FullLayout /></ProtectedRoute>}>
              <Route path='/' name='Home' element={<Navigate to="/dashboards/analytical" />} />,
              <Route path='/dashboards/analytical' name='Analytical' element={<Analytical />} />
              <Route path='/dashboards/demographical' name='Demographical' element={<Demographical />} />,
              <Route path='/dashboards/modern' name='Modern' element={<Modern />} />,
              <Route path='/about' name='about' element={<About />} />,
              <Route path='/apps/notes' name='notes' element={<Notes />} />,
              <Route path='/apps/chat' name='chat' element={<Chat />} />,
              <Route path='/apps/contacts' name='contacts' element={<Contacts />} />,
              <Route path='/apps/calendar' name='calendar' element={<Calendar />} />,
              <Route path='/apps/email' name='email' element={<Email />} />,
              <Route path='/ecom/shop' name='email' element={<Shop />} />,
              <Route path='/ecom/shopdetail' name='email' element={<ShopDetail />} />,
              <Route path='/tickt/ticket-list' name='ticket list' element={<TicketList />} />,
              <Route path='/tickt/ticket-detail' name='ticket detail' element={<TicketDetail />} />,
              <Route path='/apps/treeview' name='email' element={<Treeview />} />,
              <Route path='/ui/alerts' name='alerts' element={<Alerts />} />,
              <Route path='/ui/badges' name='badges' element={<Badges />} />,
              <Route path='/ui/buttons' name='buttons' element={<Buttons />} />,
              <Route path='/ui/cards' name='cards' element={<Cards />} />,
              <Route path='/ui/grid' name='grid' element={<Grid />} />,
              <Route path='/ui/table' name='table' element={<Tables />} />,
              <Route path='/ui/forms' name='forms' element={<Forms />} />,
              <Route path='/ui/breadcrumbs' name='breadcrumbs' element={<Breadcrumbs />} />,
              <Route path='/ui/dropdown' name='dropdown' element={<Dropdowns />} />,
              <Route path='/ui/button-group' name='button group' element={<BtnGroup />} />,
              <Route path='/ui/collapse' name='collapse' element={<Collapse />} />,
              <Route path='/ui/list-group' name='list-group' element={<ListGroup />} />,
              <Route path='/ui/modal' name='modal' element={<Modal />} />,
              <Route path='/ui/navbar' name='navbar' element={<Navbar />} />,
              <Route path='/ui/nav' name='nav' element={<Nav />} />,
              <Route path='/ui/pagination' name='pagination' element={<Pagination />} />,
              <Route path='/ui/popover' name='popover' element={<Popover />} />,
              <Route path='/ui/progress' name='progress' element={<Progress />} />,
              <Route path='/ui/spinner' name='spinner' element={<Spinner />} />,
              <Route path='/ui/tabs' name='tabs' element={<Tabs />} />,
              <Route path='/ui/toasts' name='toasts' element={<Toasts />} />,
              <Route path='/ui/tooltip' name='tooltip' element={<Tooltip />} />,
              <Route path='/form-layout/form-basic' name='form-basic' element={<FormBasic />} />,
              <Route path='/form-layout/form-grid' name='form-grid' element={<FormGrid />} />,
              <Route path='/form-layout/form-group' name='form-group' element={<FormGroup />} />,
              <Route path='/form-layout/form-input' name='form-input' element={<FormInput />} />,
              <Route path='/form-pickers/datepicker' name='datepicker' element={<Datepicker />} />,
              <Route path='/form-pickers/tag-select' name='tag-select' element={<TagSelect />} />,
              <Route path='/form-validation' name='form-validation' element={<FormValidate />} />,
              <Route path='/form-steps' name='form-steps' element={<FormSteps />} />,
              <Route path='/form-editor' name='form-editor' element={<FormEditor />} />,
              <Route path='/tables/basic-table' name='basic-table' element={<Basictable />} />,
              <Route path='/tables/react-table' name='react-table' element={<CustomReactTable />} />,
              <Route path='/tables/data-table' name='data-table' element={<ReactBootstrapTable />} />,
              <Route path='/charts/apex' name='apex' element={<ApexCharts />} />,
              <Route path='/charts/chartjs' name='chartjs' element={<ChartJs />} />,
              <Route path='/sample-pages/profile' name='profile' element={<Profile />} />,
              <Route path='/sample-pages/helper-class' name='helper-class' element={<HelperClass />} />,
              <Route path='/sample-pages/starterkit' name='starterkit' element={<StarterKit />} />,
              <Route path='/sample-pages/gallery' name='gallery' element={<Gallery />} />,
              <Route path='/sample-pages/search-result' name='search-result' element={<SearchResult />} />,
              <Route path='/icons/bootstrap' name='bootstrap' element={<Bootstrap />} />,
              <Route path='/icons/feather' name='feather' element={<Feather />} />,
              <Route path='/map/vector' name='vector' element={<CustomVectorMap />} />,
              <Route path='/widget' name='widget' element={<Widget />} />,
              <Route path='/casl' name='casl' element={<CASL />} />,
              <Route path='*' element={<Navigate to="/auth/404" />} />,
            </Route>

          </Routes>
        </AuthProvider>
      </div>
    </Suspense>
  );
};

export default App;
