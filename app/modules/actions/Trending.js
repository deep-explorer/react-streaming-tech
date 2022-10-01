import * as axios from 'axios';
import config from 'config';

/**
 * LOAD
 * @type {string}
 */
export const LOAD = 'TRENDING_LOAD';

/**
 * _loadRequest
 * @private
 */
const _loadRequest = () => ({ type: LOAD });

/**
 * _loadResponse
 * @param response
 * @private
 */
const _loadResponse = response => ({ type: LOAD, response });

/**
 * trending
 * Gets 'trending' data from API
 * Redux Action
 * Reference: http://redux.js.org/docs/basics/Actions.html
 * @returns {Function}
 */
export function load() {
	return (dispatch, getState) => {
		_loadRequest();
		const user = getState().User;
		axios
			.get(`${config.api.baseUrl}/trending?user_id=${user.id}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('jwt')}`,
				},
			})
			.then(res => {
				dispatch(_loadResponse(res.data));
			});
	};
}
