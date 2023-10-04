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
import { editComment, getSingalComment, loadingflag } from "../../redux/commentSlice"
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

    // const rowperpage = useSelector(
    //     (state) => state?.root?.history?.rowsPerPageCommentHistory
    // );
    const rowperpage = useSelector(
        (state) => state?.root?.harmfulWord?.rowsPerPage
    );
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(rowperpage);
    const [searchValue, setSearchValue] = useState("");
    const [column, setColumn] = useState("row_id");
    const [sortDirection, setSortDirection] = useState("desc");
    const singalCommentData = useSelector(
        (state) => state?.root?.comment?.singalComment
    );
    const [status, setstatus] = useState('');

    const data = useSelector(
        (state) => state?.root?.history?.historytData
    );
    const loading = useSelector(
        (state) => state?.root?.comment?.editCommentLoader
    );
    const loader = useSelector(
        (state) => state?.root?.comment?.loading
    );
    const harmfulloading = useSelector((state) => state?.root?.harmfulWord?.loading);

    const allHarmfulWord = useSelector(
        (state) => state?.root?.harmfulWord?.harmfulWordData
    );

    const debouncedQuery = useDebouncedValue(searchValue, 1000);
    const [inputText, setInputText] = useState('');
    const usersite = localStorage.getItem("usersite")
    const [badwords, setBadWords] = useState([]);
    const [originComment, setoriginComment] = useState('');
    const [convertedData, setConvertedData] = useState('');
    const [editConvertedData, seteditConvertedData] = useState('');
    const [highlighted, setHighlighted] = useState([]);
    const options = [
        { value: jsonData.activeValue, label: jsonData.activeLabel },
        { value: jsonData.inActiveValue, label: jsonData.inActiveLabel},
        { value: jsonData.notApprovedValue, label: jsonData.notApprovedLabel},
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

    useEffect(() => {
        dispatch(getHistoryComment(navigate, currentPage, rowsPerPage, searchValue, sortDirection, column, id, "comments"))
    }, [dispatch, debouncedQuery, rowsPerPage, currentPage, sortDirection])

    const textTranslate = async(singalCommentData) => {

        const [convertedText,editedText] =  await Promise.all([translateText(singalCommentData?.originalComment, usersite == "israelBackOffice" ? 'ar' : 'iw'),translateText(singalCommentData?.updatedComment, usersite == "israelBackOffice" ? 'ar' : 'iw')])
        setConvertedData(convertedText)
        seteditConvertedData(editedText)
        dispatch(loadingflag(false));
    }

    useEffect(() => {
        if(allHarmfulWord?.wordData && singalCommentData) {
            setBadWords(allHarmfulWord?.wordData?.map(item => item.word))
            setoriginComment(singalCommentData?.originalComment)
            setInputText(singalCommentData?.updatedComment && singalCommentData?.updatedComment)
            setstatus(singalCommentData?.status)
            setHighlighted(extractHighlightedWords(allHarmfulWord?.wordData?.map(item => item.word), singalCommentData?.originalComment))
            textTranslate(singalCommentData)
        }
    }, [allHarmfulWord, singalCommentData])

    //find badwordArr
    const extractHighlightedWords = (bad, comment) => {
        console.log(bad,comment)
        const badwordArr = bad?.filter((word) => {
            const likePattern = _createSQLLikePattern(word);
            const regex = new RegExp(likePattern, 'i');
            const isMatch = regex.test(comment);
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

    const handleInputChange = async (e) => {
        const text = e.target.value;
        setInputText(text);

        // Translate
        const TranslationText = await translateText(text, usersite == "israelBackOffice" ? 'ar' : 'iw');
        seteditConvertedData(TranslationText);
    };

    //edit comment
    const handleSave = () => {
        if (inputText == singalCommentData?.updatedComment) {
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
            {loader || harmfulloading ? <LoaderComponent /> : <><CardHeader className="mb-1">
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
                                        value={options.find((option) => option.value === status)}
                                        options={options}
                                        isClearable={false}
                                        onChange={(e) => {
                                            setstatus(e.value)
                                        }}
                                    />
                                </Col>
                                <Col className="col-md-2">
                                    <Label className="form-label" for="nameVerticalIcons">
                                        {jsonData.Comment.origin_site}
                                    </Label>
                                    <img className="img-fluid"
                                        type="image"
                                        disabled={true}
                                        src={singalCommentData?.site == "ittihad-today" ? Ittihadlogo : Israellogo}
                                    />
                                </Col>

                                <Col className="col-md-2">
                                    <Label className="form-label" for="nameVerticalIcons">
                                        {jsonData.Comment.submit_date}
                                    </Label>
                                    <Input
                                        type="text"
                                        disabled={true}
                                        value={moment(singalCommentData?.createdAt).format("DD.MM.YYYY HH:mm")}
                                    />
                                </Col>
                                <Col className="col-md-2">
                                    <Label className="form-label" for="nameVerticalIcons">
                                        {jsonData.Comment.approval_date}
                                    </Label>
                                    <Input
                                        type="text"
                                        disabled={true}
                                        value={moment(singalCommentData?.approvalDate).format("DD.MM.YYYY HH:mm")}
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
                                
                                <Col className="col-md-3 d-flex align-items-end">
                                    <Button type="button" color="primary" onClick={() => window.open(singalCommentData?.pageData?.isrealUrl, "_blank")} disabled={!singalCommentData?.pageData?.isrealUrl}>{jsonData.Comment.israel_button}</Button>
                                </Col>
                                <Col className="col-md-3 d-flex align-items-end">
                                    <Button type="button" color="primary" onClick={() => window.open(singalCommentData?.pageData?.ittihadUrl, "_blank")} disabled={!singalCommentData?.pageData?.ittihadUrl}>{jsonData.Comment.itthad_button}</Button>

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
                                    <Row className="mt-1">
                                        <Col className="col-md-6">
                                            <Label className="form-label" for="nameVerticalIcons">
                                                {usersite == "israelBackOffice" ? jsonData.Comment.comment_hebrew : jsonData.Comment.comment_arbic}
                                            </Label>
                                            <div
                                                style={{
                                                    border: '1px solid #ccc',
                                                    padding: '7px',
                                                    height: '70px',
                                                    outline: 'none',
                                                    resize: 'none',
                                                    overflow: 'auto',
                                                    background: '#efefef',
                                                    direction: "rtl",
                                                    borderRadius: '0.357rem',
                                                }}
                                            >
                                                <Highlighter
                                                    highlightClassName="YourHighlightClass"
                                                    searchWords={badwords}
                                                    autoEscape={true}
                                                    textToHighlight={originComment}
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
                                                value={convertedData}
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
                                                value={inputText}
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
                                                value={editConvertedData}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col className="col-md-4">
                                    <Row>
                                        <Col className="col-md-6"><h4>{jsonData.harmful_word.header}</h4><hr />
                                            <div style={{ height: "150px", overflowY: "auto" }}>
                                                <ul className="list-unstyled">
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
                                            </div>
                                        </Col>
                                        <Col className="col-md-6"><h4>{jsonData.Comment.userInfo}</h4><hr />
                                            <div >{singalCommentData?.name}</div>
                                            <div >{singalCommentData?.email}</div>
                                            <div >{singalCommentData?.ip}</div>
                                        </Col>
                                        </Row>
                                </Col>
                            </Row>
                            <hr />
                        </Form>
                    </CardBody>
                    <HistoryLogTable id={id} data={data} setCurrentPage={setCurrentPage} setRowsPerPage={setRowsPerPage} setSearchValue={setSearchValue} setColumn={setColumn} setSortDirection={setSortDirection} rowsPerPage={rowsPerPage} currentPage={currentPage} searchValue={searchValue} module='comments'exelsheetname={'commenthistoryLogs'} />
                </Card> </>}
        </>
    )
}

export default EditComment
