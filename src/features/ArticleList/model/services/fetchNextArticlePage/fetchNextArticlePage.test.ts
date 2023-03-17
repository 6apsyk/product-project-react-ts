import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchArticleList } from '../fetchArticleList/fetchArticleList';
import { fetchNextArticlePage } from './fetchNextArticlePage';

jest.mock('../fetchArticleList/fetchArticleList')
describe('fetchNextArticlePage.test', () => {
    test('success', async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlePage, {
            articlesPage: {
                entities: {},
                ids: [],
                limit: 5,
                page:2,
                isLoading: false,
                hasMore: true,
            }
        });
        
        await thunk.callThunk();

        expect(thunk.dispatch).toBeCalledTimes(4)
        expect(fetchArticleList).toHaveBeenCalledWith({page: 3})

    });

    test('fetch not called if hasMore', async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlePage, {
            articlesPage: {
                entities: {},
                ids: [],
                limit: 5,
                page:2,
                isLoading: false,
                hasMore: false,
            }
        });
        
        await thunk.callThunk();

        expect(thunk.dispatch).toBeCalledTimes(2)
        expect(fetchArticleList).not.toHaveBeenCalled()

    });

    test('fetch not called if isLoading', async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlePage, {
            articlesPage: {
                entities: {},
                ids: [],
                limit: 5,
                page:2,
                isLoading: true,
                hasMore: true,
            }
        });
        
        await thunk.callThunk();

        expect(thunk.dispatch).toBeCalledTimes(2)
        expect(fetchArticleList).not.toHaveBeenCalled()

    });


    
});
