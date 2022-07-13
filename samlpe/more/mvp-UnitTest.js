import { Assert } from '../../dist/Testing.assert.js'
import { Tea } from '../../dist/Testing.Tea.js';
const assert = new Assert();
const tea = new Tea();

// unit test target
import { SearchView } from './target/js/view/searchView.js'
import { SearchService } from './target/js/model/searchService.js'
import { SearchPresenter } from './target/js/presenter/searchPresenter.js'
import { URLQueryHepler } from './target/js/utility/urlQueryHepler.js'

//sinon - JavaScript test spies, stubs and mocks.
//import { sinon } from './node_modules/sinon/pkg/sinon-esm.js'
//or 
//- local
//<script src="./node_modules/sinon/pkg/sinon.js"></script> 
//- jsdelivr
//<script src=" https://cdn.jsdelivr.net/npm/sinon@14.0.0/pkg/sinon.min.js"></script>

describe('searchPresenter', () => {
    it('presenter.getData', () => {
        const serive = new SearchService();
        const view = new SearchView();

        const resolved = Promise.resolve({
            data: {},
        });
        sinon.stub(serive, 'getMainData').returns(resolved);
        sinon.stub(URLQueryHepler, 'replace').callsFake(() => { return {} });

        const mock = sinon.mock(view);

        mock.expects('setClickSearch').callsFake(() => { });
        mock.expects('initContent').once();
        mock.expects('getModel').once();
        mock.expects('drawContent').once();//never();

        const presenter = new SearchPresenter(view, serive);

        presenter.getData();

        return resolved.then(() => {
            mock.verify();
        });
    });
});

tea.run();
