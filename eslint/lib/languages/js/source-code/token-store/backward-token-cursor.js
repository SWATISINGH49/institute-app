/**
 * @fileoverview Define the cursor which iterates tokens only in reverse.
 * @author Toru Nagashima
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const Cursor = require("./cursor");
const { getLastIndex, getFirstIndex } = require("./utils");

//------------------------------------------------------------------------------
// Exports
//------------------------------------------------------------------------------

/**
 * The cursor which iterates tokens only in reverse.
 */
module.exports = class BackwardTokenCursor extends Cursor {
	/**
	 * Initializes this cursor.
	 * @param {Token[]} tokens The array of tokens.
	 * @param {Comment[]} comments The array of comments.
	 * @param {Object} indexMap The map from locations to indices in `tokens`.
	 * @param {number} startLoc The start location of the iteration range.
	 * @param {number} endLoc The end location of the iteration range.
	 */
	constructor(tokens, comments, indexMap, startLoc, endLoc) {
		super();
		this.tokens = tokens;
		this.index = getLastIndex(tokens, indexMap, endLoc);
		this.indexEnd = getFirstIndex(tokens, indexMap, startLoc);
	}

	/** @inheritdoc */
	moveNext() {
		if (this.index >= this.indexEnd) {
			this.current = this.tokens[this.index];
			this.index -= 1;
			return true;
		}
		return false;
	}

	/*
	 *
	 * Shorthand for performance.
	 *
	 */

	/** @inheritdoc */
	getOneToken() {
		return this.index >= this.indexEnd ? this.tokens[this.index] : null;
	}
};
