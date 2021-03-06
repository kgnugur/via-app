import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Input from '../../components/Styled/Input';
import Select from '../../components/Styled/Select';
import GridVideo from '../../components/GridVideo';
import { media } from '../../styles';
import ButtonPlus from '../../components/Styled/ButtonPlus';
import Button from '../../components/Styled/Button';
import { fetchVideos } from '../../store/actions/index';
import Spinner from '../../components/Styled/Spinner';

const LOGICAL_VALUES = ['Or', 'And'];
const RELATIONAL_VALUES = ['Before', 'During', 'After'];
const OBJECT_VALUES = ['Human', 'Car', 'Cat', 'Dog'];
const ANOMALITY_VALUES = ['Line crossing', 'Fighting', 'Car chrash'];
const TYPE_CHOOSER_VALUES = [
  'Choose',
  'Logical',
  'Relational',
  'Object',
  'Anomality'
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;

  a {
    color: inherit;
    text-decoration: none;
  }

  .search-title {
    width: 450px;
    margin-bottom: 2rem;
    ${media.phone`
      width: 100%;
      margin: 0 0 2rem 0;
    `}
  }

  button {
    margin: 0 0 1rem 0;
    align-self: center;
  }

  .query-elements {
    display: flex;
    margin-bottom: 1rem;
    ${media.phone`
      flex-flow: nowrap;
      flex-direction: column;
      width: 100%;

      select {
        width: 100%;
      }
    `}

    .query-element {
      position: relative;
      background: #fff;
      ${media.phone`
        margin: 0 0 1.9rem 0;
        width: 100%;
      `}

      .delete {
        position: absolute;
        left: 50%;
        top: -60%;
        transform: translate(-50%, +50%);
        font-size: 0.9em;
        padding: 0 1.5rem;
        border-radius: 100px;
      }

      .plus-left {
        position: absolute;
        left: 1px;
        top: 50%;
        transform: translate(0, -50%);
      }

      .plus-right {
        position: absolute;
        right: 1px;
        top: 50%;
        transform: translate(0, -50%);
      }
    }

    .query-element:not(:last-of-type) {
      margin-right: 1rem;
      ${media.phone`margin-right: 0rem;`}
    }
  }
`;

const Grid = styled.div`
  margin-top: 3rem;
  padding: 1rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

class SearchVideo extends Component {
  state = {
    titleTerm: '',
    queryElements: [
      {
        type: 'typeChooser',
        value: 'Choose'
      }
    ]
  };

  componentDidMount() {
    this.props.fetchVideos();
  }

  updateQueryElementState = (type, value, i) => {
    this.setState(({ queryElements }) => ({
      queryElements: [
        ...queryElements.slice(0, i),
        {
          type,
          value
        },
        ...queryElements.slice(i + 1)
      ]
    }));
  };

  handleSelectChange = (event, e, i) => {
    var value = event.target.value;

    this.updateQueryElementState(e.type, value, i);

    if (e.type === 'typeChooser') {
      switch (value) {
        case 'Logical':
          this.updateQueryElementState(value, LOGICAL_VALUES[0], i);
          break;
        case 'Relational':
          this.updateQueryElementState(value, RELATIONAL_VALUES[0], i);
          break;
        case 'Object':
          this.updateQueryElementState(value, OBJECT_VALUES[0], i);
          break;
        case 'Anomality':
          this.updateQueryElementState(value, ANOMALITY_VALUES[0], i);
          break;
        default:
          break;
      }
    }
  };

  getQueryElementIndex = event =>
    event.target.parentElement.getAttribute('data-key');

  renderQueryElements = () =>
    this.state.queryElements.map((e, i) => {
      return (
        <div data-key={i} key={i} className="query-element">
          <Button
            type="button"
            clicked={e => {
              console.log(this.getQueryElementIndex(e));
              this.getQueryElementIndex(e);
              this.setState({
                queryElements: [
                  ...this.state.queryElements.slice(0, i),
                  ...this.state.queryElements.slice(i + 1)
                ]
              });
            }}
            className="delete"
            deletion
          >
            x
          </Button>
          <ButtonPlus
            className="plus-left"
            type="button"
            clicked={e =>
              this.handlePlusButton(this.getQueryElementIndex(e), 'left')
            }
          />
          <Select
            value={e.value}
            changed={event => this.handleSelectChange(event, e, i)}
          >
            {this.renderQueryElementOptions(e.type, e.value)}
          </Select>
          <ButtonPlus
            className="plus-right"
            type="button"
            clicked={e => this.handlePlusButton(this.getQueryElementIndex(e))}
          />
        </div>
      );
    });

  renderQueryElementOptions = type => {
    let k = -1;
    switch (type) {
      case 'Logical':
        return LOGICAL_VALUES.map(val => <option key={k++}>{val}</option>);
      case 'Relational':
        return RELATIONAL_VALUES.map(val => <option key={k++}>{val}</option>);
      case 'Object':
        return OBJECT_VALUES.map(val => <option key={k++}>{val}</option>);
      case 'Anomality':
        return ANOMALITY_VALUES.map(val => <option key={k++}>{val}</option>);
      case 'typeChooser':
        return TYPE_CHOOSER_VALUES.map(val => <option key={k++}>{val}</option>);
      default:
        break;
    }
  };

  handlePlusButton = (i, buttonAlignment) => {
    if (buttonAlignment === 'left') {
      this.setState(({ queryElements }) => ({
        queryElements: [
          ...queryElements.slice(0, i),
          {
            type: 'typeChooser',
            value: TYPE_CHOOSER_VALUES[0]
          },
          ...queryElements.slice(i)
        ]
      }));
    } else {
      i++;
      this.setState(({ queryElements }) => ({
        queryElements: [
          ...queryElements.slice(0, i),
          {
            type: 'typeChooser',
            value: TYPE_CHOOSER_VALUES[0]
          },
          ...queryElements.slice(i)
        ]
      }));
    }
  };

  renderVideoGrids = () => {
    var filteredVideos = this.props.videos.list.filter(video =>
      video.title.includes(this.state.titleTerm)
    );
    return filteredVideos.map((v, i) => {
      return (
        <GridVideo
          key={i}
          id={v.video_id}
          title={v.title}
          time={v.length}
          objects={v.objects}
          anomalities={v.anomalities}
          thumbnail={'http://104.196.71.143:3000/static/' + v.thumbnail}
        />
      );
    });
  };

  render() {
    let videos = <Spinner />;

    if (this.props.videos.error) {
      videos = <div>{this.props.videos.error.message}</div>;
    } else if (!this.props.videos.loading) {
      videos = this.renderVideoGrids();
    }

    return (
      <Container>
        <Input
          className="search-title"
          placeHolder="Search by title"
          changed={event => this.setState({ titleTerm: event.target.value })}
        />
        <div className="query-elements">{this.renderQueryElements()}</div>
        <Button>Submit</Button>
        <Grid>{videos}</Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  videos: state.videos
});

const mapDispatchToProps = dispatch => ({
  fetchVideos: () => dispatch(fetchVideos())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchVideo);
