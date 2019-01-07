import { initRouter } from '../appUtil/router';
import main from './main';
import season from './season';

const MainRoute = () => initRouter(main);

const SeasonRoute = () => initRouter(season);

export { MainRoute, SeasonRoute };
