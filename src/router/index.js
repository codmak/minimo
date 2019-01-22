import { initRouter } from '../appUtil/router';
import main from './main';
import season from './season';

const MainRoute = props => initRouter(main, props);

const SeasonRoute = props => initRouter(season, props);

export { MainRoute, SeasonRoute };
