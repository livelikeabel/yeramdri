import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import classnames from 'classnames/bind'
import {loadRecentContents} from 'src/redux/contents/actions';
import SearchBar from 'src/components/SearchBar';
import ContentCard from 'src/components/ContentCard'
import bibleImg from 'src/assets/bible-card.jpg';
import lifeImg from 'src/assets/life-card2.jpg';
import ministryImg from 'src/assets/ministry-card.jpg';
import css from './index.scss'
const cx = classnames.bind(css)
const moduleName = 'Main'

class Main extends Component {
  state = {contentsNumber: 3}

  componentDidMount() {
    this.props.loadRecentContents();
  }

  showMoreContents = () => {
    this.setState({contentsNumber: this.state.contentsNumber + 3})
  }

  isHideArrow = () => {
    const {contentsNumber} = this.state
    const {contents} = this.props;
    return contents.length <= contentsNumber
  }

  renderButtons = () => {
    const buttonData = [
      {
        type: 'bible',
        img: bibleImg,
        title: '말씀',
        subTitle: '예수, 나를 향한 사랑의 시작'
      },
      {
        type: 'life',
        img: lifeImg,
        title: '삶',
        subTitle: '하나님과 함께하는 일상들'
      }
    ];

    return buttonData.map(({type, img, title, subTitle}, i) => (
      <Link to={`/${type}`} key={i}>
        <div className={cx(`${moduleName}-button`)}>
          <div className={cx(`${moduleName}-button-imgWrapper`)}>
            <img src={img} alt='buttonImg' />
          </div>
          <h3 className={cx(`${type}`)}>{title}</h3>
          <p>{subTitle}</p>
        </div>
      </Link>
    ))
  }

  renderContents = () => {
    const {contentsState: {pending, fulfilled}} = this.props;
    return (
      <div className={cx(`${moduleName}-contents`)}>
        <p className={cx(`${moduleName}-contents-title`)}>최신컨텐츠</p>
        <div>
          {pending && <div>Loading</div>}
          {fulfilled && this.renderContentCards()}
          <div className={cx(`${moduleName}-contents-downIcon`, {hide: this.isHideArrow()})}>
            <i
              className="fas fa-chevron-down"
              onClick={this.showMoreContents}/>
          </div>
        </div>
      </div>
    )
  }

  renderContentCards = () => {
    const {contentsNumber} = this.state
    const {contents} = this.props
    return contents.slice(0, contentsNumber).map(content => (
      <ContentCard key={content.id} content={content} />
    ))
  };

  render() {
    return (
      <div className={cx(`${moduleName}`)}>
        <div className={cx(`${moduleName}-words`)}>
          <h1 className={cx(`${moduleName}-words-title`)}>예람드리</h1>
          <p className={cx(`${moduleName}-words-subTitle`)}>
            예배자들의 삶이<br />아름드리 꽃피우길
          </p>
        </div>
        <div className={cx(`${moduleName}-searchbarWrapper`)}>
          <SearchBar
            path={`/results?search=`}
            placeholder="#말씀, #삶, #사역" />
        </div>
        <div className={cx(`${moduleName}-buttonContainer`)}>
          {this.renderButtons()}
          <div>
            <div
              className={cx(`${moduleName}-button`, `${moduleName}-button-last`, 'ministry')}
              onClick={() => {
                alert('준비중 입니다 :)')
              }}
            >
              <div className={cx(`${moduleName}-button-imgWrapper`)}>
                <img src={ministryImg} alt='ministryImg' />
              </div>
              <h3>사역</h3>
              <p>복음을 들고, 사랑을 품고</p>
            </div>
          </div>
        </div>
        {this.renderContents()}
      </div>
    )
  }
}

const mapStateToProps = ({contents: {contents, contentsState}}) => ({contents, contentsState});
const mapDispatchToProps = {loadRecentContents};

export default connect(mapStateToProps, mapDispatchToProps)(Main)
