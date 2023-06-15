import React from 'react';
import ReactPaginate from "react-paginate";
import {MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight} from "react-icons/md";

class Paginate extends React.Component<{ onChange: any, currentPage: any }> {
    render() {
        let {onChange, currentPage} = this.props;
        return (
            <>
                <ReactPaginate breakLabel="..."
                               nextLabel={<MdKeyboardDoubleArrowRight/>}
                               previousLabel={<MdKeyboardDoubleArrowLeft/>}
                               onPageChange={event => onChange(event.selected + 1)}
                               pageRangeDisplayed={4}
                               pageCount={25}
                               forcePage={currentPage - 1}
                               renderOnZeroPageCount={null}
                               activeClassName={"active"}
                />
            </>
        );
    }
}

export default Paginate;