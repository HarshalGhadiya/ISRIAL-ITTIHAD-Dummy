import React, { useEffect } from "react"
import { useNavigate } from "react-router"
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Col,
    Form,
    Input,
    Label,
    Row,
    Spinner,
} from "reactstrap"
import { handleKeyDown } from "../../utility/common/InputValidation"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import LoaderComponent from "../../utility/common/LoaderComponent"
import Select from "react-select"
import { selectThemeColors } from "@utils"
import { useDebouncedValue } from "../../utility/common/useDebouncedValue"
import Highlighter from 'react-highlight-words';
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { editComment, getSingalComment } from "../../redux/commentSlice"
import moment from "moment"
import translateText from "../../utility/common/TranslateText"
import { getHarmfulWord } from "../../redux/harmfulWordSlice"
import HistoryLogTable from "../../utility/common/HistoryLogTable"
import jsonData from "../../locales/en//translation.json"
import Ittihadlogo from "../../../src/assets/images/logo/ittihad-logo.png"
import Israellogo from "../../../src/assets/images/logo/Israel-logo.png"
import CombineLogo from "../../../src/assets/images/logo/combinelogo2.png"
import toast from "react-hot-toast";
import { getHistoryComment } from "../../redux/historyLogSlice"


const EditComment = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id } = useParams()
    // ** States
    
    const rowperpage = useSelector(
        (state) => state?.root?.history?.rowsPerPageCommentHistory
    );
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(rowperpage);
    const [searchValue, setSearchValue] = useState("");
    const [column, setColumn] = useState("row_id");
    const [sortDirection, setSortDirection] = useState("desc");
    const singalCommentData = useSelector(
        (state) => state?.root?.comment?.singalComment
    );
    const [status, setstatus] = useState(singalCommentData?.status);
        
    const data = useSelector(
        (state) => state?.root?.history?.historytData
    );
    const loading = useSelector(
        (state) => state?.root?.comment?.editCommentLoader
    );
    const loader = useSelector(
        (state) => state?.root?.comment?.loading
    );
    const allHarmfulWord = useSelector(
        (state) => state?.root?.harmfulWord?.harmfulWordData
    );

    const debouncedQuery = useDebouncedValue(searchValue, 1000);
    const [inputText, setInputText] = useState('');
    const [arabicText, setArabicText] = useState('');
    const [hebrewText, setHebrewText] = useState('');
    const usersite = localStorage.getItem("usersite")
    const [badwords, setBadWords] = useState([]);

    const options = [
        { value: jsonData.activeValue, label: jsonData.activeLabel },
        { value: jsonData.inActiveValue, label: jsonData.inActiveLabel },
    ]

    useEffect(() => {
        //for access route
        const userData = JSON.parse(localStorage.getItem("userData"))
        const permissionArr = userData?.permissions?.filter((section) => section?.section == "comments")
        const checkPermission = permissionArr[0]?.permissions?.write && permissionArr[0]?.permissions?.read
        if (!checkPermission) {
            navigate('/comments')
            toast.error(jsonData.errormsg, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        dispatch(getSingalComment(navigate, id))
        dispatch(
            getHarmfulWord(navigate, '', '', '', '', '', false)
        );
    }, [dispatch, id])
console.log(column)
    useEffect(() => {
        dispatch(getHistoryComment(navigate, currentPage, rowsPerPage, searchValue, sortDirection, column, id, "comments"))
    }, [dispatch, debouncedQuery, rowsPerPage, currentPage, sortDirection])

    useEffect(() => {
        setBadWords(allHarmfulWord?.wordData?.map(item => item.word))
    }, [allHarmfulWord])

    //find badwordArr
    const extractHighlightedWords = () => {
        const badwordArr = badwords?.filter((word) => {
            const likePattern = _createSQLLikePattern(word);
            const regex = new RegExp(likePattern, 'i');
            const isMatch = regex.test(singalCommentData?.originalComment);
            if (isMatch) {
                return word
            }
        })
        return badwordArr;
    };
    function _createSQLLikePattern(word) {
        const escapedWord = word?.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')?.replace(/%/g, '.*');
        return `.*${escapedWord}.*`;
    }
    const highlighted = extractHighlightedWords();

    const handleInputChange = async (e) => {
        const text = e.target.value;
        setInputText(text);
        // Translate to Arabic
        // const arabicText = await translateText(text, 'ar');
        // setArabicText(arabicText);

        // Translate to Hebrew
        // const hebrewTranslation = await translateText(text, 'iw');
        // setHebrewText(hebrewTranslation);
    };

    //edit comment
    const handleSave = () => {
        if (inputText == '') {
            if (status == singalCommentData?.status) {
                dispatch(editComment(navigate, {}, id))
            } else {
                const data = { status }
                dispatch(editComment(navigate, data, id))
            }
        } else {
            if (status == singalCommentData?.status) {
                const data = { updatedComment: inputText }
                dispatch(editComment(navigate, data, id))
            } else {
                const data = { updatedComment: inputText, status }
                dispatch(editComment(navigate, data, id))
            }
        }
    }
    //show upadteby name
    const updatedByUser = singalCommentData?.updatedByUser && singalCommentData?.updatedByUser?.firstname + ' ' + singalCommentData?.updatedByUser?.lastname
    const updatedByAdmin = singalCommentData?.updatedByAdmin && singalCommentData?.updatedByAdmin?.firstname + " " + singalCommentData?.updatedByAdmin?.lastname
    const name = updatedByUser ? updatedByUser.charAt(0).toUpperCase() + updatedByUser.slice(1) :
        updatedByAdmin ? updatedByAdmin.charAt(0).toUpperCase() + updatedByAdmin.slice(1) : ""

    return (
        <>
            <head>
                <title>{jsonData.title.Edit_comment} - {usersite == "israelBackOffice" ? jsonData.sitename.israel : jsonData.sitename.ittihad}</title>
            </head>
            {loader ? <LoaderComponent /> : <><CardHeader className="mb-1">
                <Row>
                    <Col
                        className="d-flex align-items-center justify-content-sm-start mt-sm-0 mt-1"
                        sm="8"
                    >
                        <CardTitle tag="h4">{jsonData.title.comment}</CardTitle>
                    </Col>
                    <Col
                        className="d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1"
                        sm="4"
                    >
                        <Button
                            outline
                            color="primary"
                            onClick={() => navigate(-1)}>{jsonData.back}</Button>
                    </Col>
                </Row>
            </CardHeader>
                <Card>
                    <CardHeader>
                        {id && <CardTitle tag="h4">{jsonData.roomId} :- {singalCommentData?.row_id}</CardTitle>}
                        <Button onClick={handleSave} color="primary" type="submit">
                            {loading && (
                                <Spinner
                                    className="me-1 text-light spinner-border-sm"
                                    size={10}
                                />
                            )}
                            {jsonData.save}
                        </Button>
                    </CardHeader>
                    <CardBody className="pb-0">
                        <Form>
                            <Row>
                                <Col className="col-md-2">
                                    <Label className="form-label" for="nameVerticalIcons">
                                        <span className="text-danger">*</span>{jsonData.Comment.status}
                                    </Label>
                                    <Select
                                        name={"status"}
                                        theme={selectThemeColors}
                                        className="react-select"
                                        classNamePrefix="select"
                                        defaultValue={options.find((option) => option.value === singalCommentData?.status)}
                                        options={options}
                                        isClearable={false}
                                        onChange={(e) => {
                                            setstatus(e.value)
                                        }}
                                    />
                                    {
                                        console.log(options?.find((option) => option?.value === singalCommentData?.status))

                                    }
                                </Col>
                                <Col className="col-md-2">
                                    <Label className="form-label" for="nameVerticalIcons">
                                        {jsonData.Comment.origin_site}
                                    </Label>
                                    <img
                                        type="image"
                                        disabled={true}
                                        src={singalCommentData?.site == "ittihad-today"
                                            ? Ittihadlogo
                                            : singalCommentData?.site == "israel-today"
                                                ? Israellogo
                                                : CombineLogo}
                                    />
                                </Col>

                                <Col className="col-md-2">
                                    <Label className="form-label" for="nameVerticalIcons">
                                        {jsonData.Comment.submit_date}
                                    </Label>
                                    <Input
                                        type="text"
                                        disabled={true}
                                        value={singalCommentData?.createdAt}
                                    />
                                </Col>
                                <Col className="col-md-2">
                                    <Label className="form-label" for="nameVerticalIcons">
                                        {jsonData.Comment.approval_date}
                                    </Label>
                                    <Input
                                        type="text"
                                        disabled={true}
                                        value={singalCommentData?.approvalDate}
                                    />
                                </Col>
                                <Col className="col-md-2">
                                    <Label className="form-label" for="nameVerticalIcons">
                                        {jsonData.Comment.approval_admin}
                                    </Label>
                                    <Input
                                        type="text"
                                        disabled={true}
                                        value={name}
                                    />
                                </Col>
                            </Row>
                            <Row className="mt-1">
                                <Col className="col-md-6">
                                    <Label className="form-label" for="nameVerticalIcons">
                                        {jsonData.Comment.page_name}
                                    </Label>
                                    <Input
                                        type="text"
                                        disabled={true}
                                        value={singalCommentData?.site === 'ittihad-today' ? singalCommentData?.pageData?.ittihadPage : singalCommentData?.pageData?.israelPage}
                                    />
                                </Col>
                                <Col className="col-md-3 d-flex justify-content-center align-items-end">
                                    <Button type="button" color="primary">{jsonData.Comment.israel_button}</Button>
                                </Col>

                                <Col className="col-md-3 d-flex justify-content-start align-items-end">
                                    <Button type="button" color="primary">{jsonData.Comment.itthad_button}</Button>
                                </Col>
                            </Row>
                            <hr />
                            <Row className="mt-1">
                                <Col className="col-md-12">
                                    <h4>{jsonData.Comment.comment_data}</h4>
                                </Col>
                            </Row>
                            <hr />
                            <Row className="mt-1">
                                <Col className="col-md-8">
                                    <Row>
                                        <Col className="col-md-6">
                                            <Label className="form-label" for="nameVerticalIcons">
                                                {usersite == "israelBackOffice" ? jsonData.Comment.comment_hebrew : jsonData.Comment.comment_arbic}
                                            </Label>
                                            <div contentEditable="false"
                                                style={{
                                                    border: '1px solid #ccc',
                                                    padding: '5px',
                                                    minHeight: '70px',
                                                    outline: 'none',
                                                    resize: 'none',
                                                    overflow: 'auto',
                                                    background: '#efefef',
                                                    direction: "rtl"
                                                }}
                                            >
                                                <Highlighter
                                                    highlightClassName="YourHighlightClass"
                                                    searchWords={badwords}
                                                    autoEscape={true}
                                                    textToHighlight={singalCommentData?.originalComment}
                                                    highlightStyle={{ background: 'yellow' }}
                                                />
                                            </div>
                                        </Col>
                                        <Col className="col-md-6">
                                            <Label className="form-label" for="nameVerticalIcons">
                                                {jsonData.Comment.cooment_translate}
                                            </Label>
                                            <Input
                                                type="textarea"
                                                disabled={true}
                                                style={{ direction: "rtl" }}
                                                value={singalCommentData?.originalComment}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="mt-1">
                                        <Col className="col-md-6">
                                            <Label className="form-label" for="nameVerticalIcons">
                                                {usersite == "israelBackOffice" ? jsonData.Comment.editComment_hebrew : jsonData.Comment.editComment_arbic}{usersite == "israelBackOffice" ? jsonData.sitename.israelAdmin : jsonData.sitename.ittihadAdmin}
                                            </Label>
                                            <Input
                                                type="textarea"
                                                // value={inputText}
                                                onKeyDown={handleKeyDown}
                                                style={{ direction: "rtl" }}
                                                onChange={handleInputChange}
                                            />
                                        </Col>
                                        <Col className="col-md-6">
                                            <Label className="form-label" for="nameVerticalIcons">
                                                {usersite == "israelBackOffice" ? jsonData.Comment.editComment_arbic : jsonData.Comment.editComment_hebrew}{usersite == "israelBackOffice" ? jsonData.sitename.ittihadAdmin : jsonData.sitename.israelAdmin}
                                            </Label>
                                            <Input
                                                type="textarea"
                                                style={{ direction: "rtl" }}
                                                disabled={true}
                                                value={usersite == "israelBackOffice" ? arabicText : hebrewText}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col className="col-md-4">
                                    <Row>
                                        <Col className="col-md-6"><h4>{jsonData.harmful_word.header}</h4><hr />
                                            <ul>
                                                {
                                                    highlighted?.map((word, index) => (
                                                        <>
                                                            <li key={index}>
                                                                {word}
                                                            </li>
                                                        </>
                                                    ))
                                                }
                                            </ul>
                                        </Col>
                                        <Col className="col-md-6"><h4>{jsonData.Comment.userInfo}</h4><hr /></Col>
                                    </Row>
                                </Col>
                            </Row>
                            <hr />
                        </Form>
                    </CardBody>
                    <HistoryLogTable data={data} setCurrentPage={setCurrentPage} setRowsPerPage={setRowsPerPage} setSearchValue={setSearchValue} setColumn={setColumn} setSortDirection={setSortDirection} rowsPerPage={rowsPerPage} currentPage={currentPage} searchValue={searchValue} module='comments' />
                </Card> </>}
        </>
    )
}

export default EditComment
