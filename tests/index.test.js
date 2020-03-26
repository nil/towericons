import React from 'react'
import testRenderer from 'react-test-renderer'

import { AlertTriangle, Video, getIconByName, iconsByName } from '../index';
import FileRemove from '../FileRemove';

const render = el => testRenderer.create(el).toJSON();

describe('iconsByName', () => {
  test('Import {getIconByName}', () => {
    const Icon = getIconByName('video');
    expect(Icon).toEqual(Video);
  });

  test('Find icon by its kebab-case name', () => {
    expect(iconsByName['alert-triangle']).toEqual(AlertTriangle);
  });

  test('Icons can be imported from two places', () => {
    expect(getIconByName('file-remove')).toEqual(FileRemove);
  });
})

describe('className prop', () => {
  test('No className by default', () => {
    expect(render(<FileRemove />).props.className).toBeUndefined();
  })
  test('Output the same className prop', () => {
    expect(render(<FileRemove className="foo" />).props.className).toEqual('foo');
  });
});

describe('size props', () => {
  test('Change size with prop size', () => {
    const renderProps = render(<FileRemove size={24} />).props;
    expect(renderProps.height).toEqual(24);
    expect(renderProps.width).toEqual(24);
  });

  test('Change size with prop height', () => {
    const renderProps = render(<FileRemove height={16} />).props;
    expect(renderProps.height).toEqual(16);
    expect(renderProps.width).toEqual(16);
  });

  test('Change size with prop width', () => {
    const renderProps = render(<FileRemove width={48} />).props;
    expect(renderProps.height).toEqual(48);
    expect(renderProps.width).toEqual(48);
  });

  test('Change size with prop height and width', () => {
    const renderProps = render(<FileRemove height={24} width={32} />).props;
    expect(renderProps.height).toEqual(24);
    expect(renderProps.width).toEqual(32);
  });

  test('Change size with prop size and width', () => {
    const renderProps = render(<FileRemove size={16} width={48} />).props;
    expect(renderProps.height).toEqual(16);
    expect(renderProps.width).toEqual(48);
  });
});

describe('Icon accessibiliy', () => {
  test('Role img', () => {
    expect(render(<FileRemove />).props.role).toEqual('img');
  });

  test('aria-hidden is true by default', () => {
    const renderProps = render(<FileRemove />).props;
    expect(renderProps['aria-hidden']).toBeTruthy();
    expect(renderProps['aria-label']).toBeUndefined();
  });

  test('Change aria-label', () => {
    const renderProps = render(<FileRemove ariaLabel="foo" />).props;
    expect(renderProps['aria-hidden']).toBeFalsy();
    expect(renderProps['aria-label']).toEqual('foo');
  });
});

describe('viewBox', () => {
  test('Default viewBox', () => {
    expect(render(<FileRemove />).props.viewBox).toEqual('0 0 32 32');
  });

  test('ViewBox does not change when size changes', () => {
    expect(render(<FileRemove size={40} />).props.viewBox).toEqual('0 0 32 32');
  });
});
