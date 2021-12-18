import IRoute from "../interfaces/route";
import ClassForm from "../pages/classForm";
import HomePage from "../pages/home";

const routes: IRoute[] = [
    {
        path: '/',
        name: 'Home Page',
        component: HomePage,
        exact: true
    },
    {
        path: '/arunjayaraman95.github.io/schedule',
        name: 'Scheduler',
        component: ClassForm,
        exact: true
    }
]

export default routes;